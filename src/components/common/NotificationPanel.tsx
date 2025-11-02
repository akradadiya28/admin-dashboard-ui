'use client'

import { User } from '@/lib/icons'
import { notificationsData, activitiesData, contactsData } from '@/data/notifications'

export default function NotificationPanel() {
  const notifications = notificationsData
  const activities = activitiesData
  const contacts = contactsData

  return (
    <aside className="w-full sm:w-[280px] border-l border-black/10 dark:border-white/10 bg-white dark:bg-[#1f1f1f] flex flex-col p-4 sm:p-5 gap-4 sm:gap-6 overflow-y-auto h-screen fixed md:sticky top-0 right-0 scrollbar-auto-hide z-30 md:z-auto">
      {/* Notifications Section */}
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 sm:mb-3 p-1 sm:p-2">
          Notifications
        </h3>
        <div className="space-y-1">
          {notifications.map((notif, idx) => (
            <button
              key={idx}
              className="w-full flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${notif.bgColor} flex items-center justify-center shrink-0`}
              >
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs sm:text-sm text-black dark:text-white truncate">
                  {notif.title}
                </p>
                <span className="text-[10px] sm:text-xs text-black/40 dark:text-white/40">
                  {notif.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 sm:mb-3">
          Activities
        </h3>
        <div className="space-y-1 relative">
          {/* Vertical Line */}
          <div className="absolute left-5 sm:left-6 top-6 bottom-2 w-px bg-black/10 dark:bg-white/10"></div>
          {activities.map((activity, idx) => (
            <button
              key={idx}
              className="w-full flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br ${activity.gradient} flex items-center justify-center shrink-0 text-xs z-10 overflow-hidden`}
              >
                <img
                  src={activity.avatar}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs sm:text-sm text-black dark:text-white truncate">
                  {activity.title}
                </p>
                <span className="text-[10px] sm:text-xs text-black/40 dark:text-white/40">
                  {activity.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-2 sm:mb-3">
          Contacts
        </h3>
        <div className="space-y-0.5">
          {contacts.map((contact, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br ${contact.color} p-0.5 flex items-center justify-center shrink-0`}
              >
                <div className="w-full h-full bg-white dark:bg-black rounded-full overflow-hidden">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="text-xs sm:text-sm text-black dark:text-white truncate">
                {contact.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
