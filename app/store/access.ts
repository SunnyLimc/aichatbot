import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getHeaders } from "../client/api";
import { StoreKey } from "../constant";
import { BOT_HELLO } from "./chat";
import { ALL_MODELS } from "./config";

export interface AccessControlStore {
  accessCode: string;
  token: string;
  titleAlias: string;

  needCode: boolean;
  hideUserApiKey: boolean;

  openaiUrl: () => string;
  configUrl: () => string;
  updateToken: (_: string) => void;
  updateCode: (_: string) => void;
  updateTitleAlias: (_: string) => void;
  getTitleAlias: () => string;
  enabledAccessControl: () => boolean;
  isAuthorized: () => boolean;
  fetch: () => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

export const getAccessStore = (path = window.location.pathname) =>
  create<AccessControlStore>()(
    persist(
      (set, get) => ({
        token: "",
        accessCode: "",
        titleAlias: "",
        needCode: true,
        hideUserApiKey: false,

        openaiUrl() {
          return window.location.pathname + "api/openai/";
        },
        configUrl() {
          return window.location.pathname + "api/config";
        },

        enabledAccessControl() {
          get().fetch();

          return get().needCode;
        },
        updateCode(code: string) {
          set(() => ({ accessCode: code }));
        },
        updateToken(token: string) {
          set(() => ({ token }));
        },
        updateTitleAlias(titleAlias: string) {
          set(() => ({ titleAlias }));
        },
        getTitleAlias() {
          get().fetch();

          return get().titleAlias;
        },
        isAuthorized() {
          get().fetch();

          // has token or has code or disabled access control
          return (
            !!get().token || !!get().accessCode || !get().enabledAccessControl()
          );
        },
        fetch() {
          if (fetchState > 0) return;
          fetchState = 1;
          fetch(this.configUrl(), {
            method: "post",
            body: null,
            headers: {
              ...getHeaders(),
            },
          })
            .then((res) => res.json())
            .then((res: DynamicConfig) => {
              console.log("[Config] got config from server", res);
              set(() => ({ ...res }));

              if (!res.enableGPT4) {
                ALL_MODELS.forEach((model) => {
                  if (model.name.startsWith("gpt-4")) {
                    (model as any).available = false;
                  }
                });
              }
              if (res.titleAlias?.length) {
                this.updateTitleAlias(res.titleAlias);
                document.title = "AI ChatBot" + " (" + res.titleAlias + ")";
              } else {
                this.updateTitleAlias("");
              }
              if ((res as any).botHello) {
                BOT_HELLO.content = (res as any).botHello;
              }
            })
            .catch(() => {
              console.error("[Config] failed to fetch config");
            })
            .finally(() => {
              fetchState = 2;
            });
        },
      }),
      {
        name: StoreKey.Access,
        version: 1,
      },
    ),
  );
