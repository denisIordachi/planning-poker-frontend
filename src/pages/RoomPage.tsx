import { FC, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../contexts/RoomContext";
import type { User } from "../types";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { rotateY: 0 },
  revealed: { rotateY: 180, transition: { duration: 0.6 } },
};

const RoomPage: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { room, vote, reset, joinRoom } = useContext(RoomContext)!;
  const hasPrompted = useRef(false);
  const cards = ["1", "2", "3", "4", "5", "6", "7", "8"];

  useEffect(() => {
    if (!room && !hasPrompted.current) {
      hasPrompted.current = true;
      const name = window.prompt(`Enter your name to join room ${roomId}`);
      if (name && name.trim()) {
        joinRoom(roomId!, name.trim());
      }
    }
  }, [roomId, room, joinRoom]);

  if (!room) {
    return (
      <p className="text-center text-gray-800 dark:text-gray-200">
        Joining room {roomId}...
      </p>
    );
  }

  return (
    <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Room: {room.id}
        </h2>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          onClick={reset}
        >
          Reset Votes
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
        {cards.map((c) => (
          <motion.button
            key={c}
            type="button"
            onClick={() => vote(c)}
            className="relative w-28 h-40 !bg-gray-200 dark:!bg-gray-900 rounded-xl border-4 border-gray-300 dark:border-gray-600 shadow-lg flex flex-col items-center justify-center font-bold text-3xl text-gray-900 dark:text-white hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="absolute top-2 left-3 text-sm text-gray-500 dark:text-gray-400">
              {c}
            </span>
            <span className="absolute bottom-2 right-3 text-sm text-gray-500 dark:text-gray-400">
              {c}
            </span>
            {c}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {room.users.map((u: User) => (
          <motion.div
            key={u.id}
            className="relative w-full h-32 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-md flex flex-col justify-center items-center text-gray-900 dark:text-white"
            animate={room.revealed ? "revealed" : "hidden"}
            variants={cardVariants}
          >
            <motion.div
              className="w-full h-full flex flex-col justify-center items-center"
              variants={cardVariants}
              animate={room.revealed ? "revealed" : "hidden"}
            >
              <div className="absolute top-2 left-3 text-xs text-gray-500 dark:text-gray-400">
                {u.name}
              </div>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {room.revealed ? u.vote ?? "–" : "❔"}
              </div>
              <div className="absolute bottom-2 right-3 text-xs text-gray-500 dark:text-gray-400">
                {u.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
