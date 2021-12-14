import socket from "../config/socket-io";
import { EventTypes } from "../types/events";

interface CellData {
  rowIndex: number;
  noteIndex: number;
}

// abstract this even more
class SocketService {
  sendCellClickEvent(data: CellData) {
    socket.emit(EventTypes.SEQUENCER_CELL_CLICK, data);
  }

  subscribeToCellClick(cb: any) {
    socket.on(EventTypes.SEQUENCER_CELL_CLICK, cb);
  }
}

export default new SocketService();
