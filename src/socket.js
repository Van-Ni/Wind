import io from "socket.io-client"; 
import { host } from "./utils/APIRoutes"

let socket;

const connectSocket = (user_id) => {
  socket = io(host, {
    query: `user_id=${user_id}`,
  });
} 

export {socket, connectSocket};
