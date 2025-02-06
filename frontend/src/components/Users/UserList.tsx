import type React from "react"

interface User {
  id: number
  email: string
  is_active: boolean
  role: string
}

interface UserListProps {
  users: User[]
  onSelectUser: (user: User) => void
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer" onClick={() => onSelectUser(user)}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{user.email}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">Role: {user.role}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList

