import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 bg-base-100/50"
    >
      <div className="max-w-md text-center space-y-6">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.1
          }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            {/* Floating dots animation */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-10, -20, -30],
                  x: Math.sin(i * 120 * Math.PI / 180) * 15
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: '50%',
                  bottom: '-5px'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-base-content">
            Welcome to Chatty!
          </h2>
          <p className="text-base-content/60 text-sm md:text-base">
            Select a conversation from the sidebar to start chatting,<br />
            or create a new one to connect with others.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default NoChatSelected;