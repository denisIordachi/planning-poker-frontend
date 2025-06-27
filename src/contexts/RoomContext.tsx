import {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  FC,
  Dispatch
} from 'react';
import { io, Socket } from 'socket.io-client';
import type { Room } from '../types';
import { useNavigate } from 'react-router';

const socket: Socket = io('http://localhost:4000');
console.log('Socket initialized:', socket);

type State = { room?: Room };

enum ActionType {
  ROOM_UPDATE = 'ROOM_UPDATE'
}

interface Action {
  type: ActionType.ROOM_UPDATE;
  payload: Room;
}

function reducer(state: State, action: Action): State {
  console.log('Reducer called with action:', action);
  switch (action.type) {
    case ActionType.ROOM_UPDATE:
      console.log('Updating state.room to:', action.payload);
      return { room: action.payload };
    default:
      console.log('Unknown action type, returning current state');
      return state;
  }
}

export interface RoomContextType {
  room?: Room;
  createRoom: (name: string) => void;
  joinRoom: (id: string, name: string) => void;
  vote: (value: string) => void;
  reset: () => void;
}

export const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: FC<RoomProviderProps> = ({ children }) => {
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer(reducer, {});
  const navigate = useNavigate();
  console.log('RoomProvider state on render:', state);

  useEffect(() => {
    console.log('Subscribing to roomUpdate events');
    socket.on('roomUpdate', (updatedRoom: Room) => {
      console.log('Received roomUpdate from server:', updatedRoom);
      dispatch({ type: ActionType.ROOM_UPDATE, payload: updatedRoom });
    });
    return () => {
      console.log('Unsubscribing from roomUpdate events');
      socket.off('roomUpdate');
    };
  }, []);

  const createRoom = (name: string) => {
    socket.emit('createRoom', name, (roomId: string, room: Room) => {
      console.log(1, roomId, room);
      dispatch({ type: ActionType.ROOM_UPDATE, payload: room });
      navigate(`/${roomId}`);
    });
  };

  const joinRoom = (id: string, name: string): void => {
    console.log(`Emitting joinRoom id=${id}, name=${name}`);
    socket.emit('joinRoom', id, name, (err: string | null) => {
      console.log('joinRoom callback, err:', err);
      if (err) return alert(err);
      navigate(`/${id}`);
    });
  };

  const vote = (value: string): void => {
    console.log('vote called with value:', value);
    if (!state.room) {
      console.warn('vote: no room in state, aborting');
      return;
    }
    console.log('Emitting vote for room:', state.room.id, 'value:', value);
    socket.emit('vote', state.room.id, value);
  };

  const reset = (): void => {
    if (!state.room) {
      console.warn('reset: no room in state, aborting');
      return;
    }
    console.log('Emitting reset for room:', state.room.id);
    socket.emit('reset', state.room.id);
  };

  return (
    <RoomContext.Provider value={{ room: state.room, createRoom, joinRoom, vote, reset }}>
      {children}
    </RoomContext.Provider>
  );
};