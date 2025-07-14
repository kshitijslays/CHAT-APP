import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Filter, MessageCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => !showOnlineOnly || onlineUsers.includes(user._id))
    .filter((user) => 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 w-full p-4 lg:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
              <MessageCircle className="size-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Messages</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {filteredUsers.length} contact{filteredUsers.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button className="hidden lg:block p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}><Settings  className="size-4  text-slate-600 dark:text-slate-300" />
              </Link>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-3 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${
                showOnlineOnly ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform transform ${
                  showOnlineOnly ? 'translate-x-5' : 'translate-x-1'
                } mt-1`} />
              </div>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
              Online only
            </span>
          </label>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto overflow-x-hidden w-full py-2 flex-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 lg:p-4 flex items-center gap-3 lg:gap-4 mx-2 lg:mx-3 my-1 rounded-xl
              hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200
              hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]
              ${selectedUser?._id === user._id 
                ? "bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500/50 shadow-md" 
                : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 lg:size-14 object-cover rounded-full border-2 border-white dark:border-slate-600 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-sm animate-pulse" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 pr-2">
              <div className="font-semibold truncate text-slate-800 dark:text-slate-100 mb-1">
                {user.fullName}
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  onlineUsers.includes(user._id) ? 'bg-green-500' : 'bg-slate-400'
                }`} />
                <span className={`text-xs font-medium truncate ${
                  onlineUsers.includes(user._id) 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            {/* Notification dot for selected user */}
            {selectedUser?._id === user._id && (
              <div className="hidden lg:block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8 px-4">
            <Users className="size-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium mb-1">No contacts found</p>
            <p className="text-sm opacity-75">
              {searchTerm ? "Try adjusting your search" : "No online users available"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;