import { FC, useContext, useState } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import { motion } from 'framer-motion';

const Lobby: FC = () => {
  const { createRoom, joinRoom } = useContext(RoomContext)!;
  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [touched, setTouched] = useState<{ name: boolean }>({ name: false });

  const nameIsValid = name.trim().length > 0;
  const roomIdIsValid = roomId.trim().length > 0;

  const handleCreate = () => {
    setTouched({ name: true });
    if (!nameIsValid) return;
    createRoom(name.trim());
  };

  const handleJoin = () => {
    setTouched({ name: true });
    if (!nameIsValid || !roomIdIsValid) return;
    joinRoom(roomId.trim(), name.trim());
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6 transition-colors duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Planning Poker
      </h2>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onBlur={() => setTouched(t => ({ ...t, name: true }))}
        onChange={e => setName(e.target.value)}
        className={`
          w-full p-3
          bg-gray-100 dark:bg-gray-700
          border ${touched.name && !nameIsValid ? 'border-red-500' : 'border-gray-300'} 
          dark:border-gray-600
          rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
          text-gray-900 dark:text-gray-100
        `}
      />
      {touched.name && !nameIsValid && (
        <p className="w-full text-left text-red-500 text-sm">Name is required</p>
      )}

      <motion.button
        type="button"
        onClick={handleCreate}
        disabled={!nameIsValid}
        className={`
          w-full py-3
          ${nameIsValid
            ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
            : 'bg-blue-300 cursor-not-allowed'}
          text-white font-semibold rounded-lg shadow transition
        `}
        whileHover={nameIsValid ? { scale: 1.03 } : {}}
        whileTap={nameIsValid ? { scale: 0.97 } : {}}
      >
        Create Room
      </motion.button>

      <div className="flex w-full space-x-2">
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          className={`
            flex-grow p-3
            bg-gray-100 dark:bg-gray-700
            border ${!roomIdIsValid && touched.name ? 'border-red-500' : 'border-gray-300'} 
            dark:border-gray-600
            rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500
            text-gray-900 dark:text-gray-100
          `}
        />
        <motion.button
          type="button"
          onClick={handleJoin}
          disabled={!nameIsValid || !roomIdIsValid}
          className={`
            px-4 py-3
            ${nameIsValid && roomIdIsValid
              ? 'bg-green-500 dark:bg-green-400 hover:bg-green-600 dark:hover:bg-green-500'
              : 'bg-green-300 cursor-not-allowed'}
            text-white font-semibold rounded-r-lg shadow transition
          `}
          whileHover={nameIsValid && roomIdIsValid ? { scale: 1.03 } : {}}
          whileTap={nameIsValid && roomIdIsValid ? { scale: 0.97 } : {}}
        >
          Join
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Lobby;
