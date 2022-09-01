import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
const wss = new WebSocketServer({ port: 8080 });
import { Blob } from "buffer";

const clientNanoIdMap = new Map();

wss.on("connection", function connection(ws) {
  const _nanoId = nanoid();
  clientNanoIdMap.set(_nanoId, ws);

  console.log(
    `[${new Date().toISOString()}] clientNanoIdMap size: ${
      clientNanoIdMap.size
    }`
  );

  ws.on("message", function message(data) {
    console.log(
      "received from %s",
      _nanoId,
      "size(Byte):",
      new Blob([data.toString("utf-8")]).size / 8
    );
    for (const [nanoId, ws] of clientNanoIdMap) {
      if (nanoId !== _nanoId) {
        console.log("sending to %s", nanoId);
        ws.send(data.toString("utf-8"));
      }
    }
  });

  ws.on("close", () => {
    clientNanoIdMap.delete(_nanoId);
    console.log(
      `[${new Date().toISOString()}] clientNanoIdMap size: ${
        clientNanoIdMap.size
      }`
    );
  });
});
