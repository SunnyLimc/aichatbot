import { NextResponse } from "next/server";

import { getServerSideConfig } from "../../config/server";

const serverConfig = getServerSideConfig();

// Danger! Don not write any secret value here!
// 警告！不要在这里写入任何敏感信息！
const DYNAMIC_CONFIG = {
  needCode: serverConfig.needCode,
  hideUserApiKey: serverConfig.hideUserApiKey,
  enableGPT4: serverConfig.enableGPT4,
  titleAlias: serverConfig.titleAlias,
};

declare global {
  type DynamicConfig = typeof DYNAMIC_CONFIG;
}

async function handle() {
  return NextResponse.json(DYNAMIC_CONFIG);
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
