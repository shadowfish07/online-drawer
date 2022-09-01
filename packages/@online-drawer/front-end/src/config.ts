export function getWebsocketServerUrl() {
  return import.meta.env.VITE_WEBSOCKET_SERVER_URL ?? "ws://localhost:8081";
}
