export default class WebSocketProvider {
  static ws: WebSocket | null = null;
  static sendMessageCache: string[] = [];
  static onMessageCallbacks: ((data: string) => void)[] = [];

  static connect(url: string) {
    if (!WebSocketProvider.ws) {
      WebSocketProvider.ws = new WebSocket(url);
      WebSocketProvider.ws.onopen = () => {
        console.log("open");
        WebSocketProvider.sendMessageCache.forEach((item) => {
          WebSocketProvider.ws?.send(item);
        });
        WebSocketProvider.sendMessageCache = [];
      };
      WebSocketProvider.ws.onmessage = (data) => {
        console.log(data);
        WebSocketProvider.onMessageCallbacks.forEach((callback) => {
          callback(data.data);
        });
      };
    }

    return WebSocketProvider.ws;
  }

  static send(data: object) {
    if (WebSocketProvider.ws?.readyState === WebSocket.OPEN) {
      WebSocketProvider.ws?.send(JSON.stringify(data));
      return;
    }

    WebSocketProvider.sendMessageCache.push(JSON.stringify(data));
  }

  static addOnMessageCallback(callback: (data: string) => void) {
    WebSocketProvider.onMessageCallbacks.push(callback);
  }

  static clearOnMessageCallBack() {
    WebSocketProvider.onMessageCallbacks = [];
  }
}
