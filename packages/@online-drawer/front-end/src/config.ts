export function getWebsocketServerUrl() {
  return import.meta.env.VITE_WEBSOCKET_SERVER_URL ?? "ws://127.0.0.1:8081";
}
