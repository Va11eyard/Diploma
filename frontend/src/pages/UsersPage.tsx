import type React from "react"
import { useState, useEffect } from "react"
import UserList from "../components/Users/UserList"
import UserCard from "../components/Users/UserCard"
import UserForm from "../components/Users/UserForm"
import { getUsers, createUser, updateUser, deleteUser } from "../services/users"

interface User {
  id: number
  email: string
  is_active: boolean
  role: string
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers as User[])
    } catch (error) {
      console.error("Failed to fetch users:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleCreateUser = async (userData: Omit<User, "id">) => {
    try {
      await createUser(userData)
      fetchUsers()
      setIsFormOpen(false)
    } catch (error) {
      console.error("Failed to create user:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleUpdateUser = async (userId: number, userData: Partial<User>) => {
    try {
      await updateUser(userId, userData)
      fetchUsers()
      setIsFormOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Failed to update user:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId)
      fetchUsers()
      setSelectedUser(null)
    } catch (error) {
      console.error("Failed to delete user:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button
        className="bg-black hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsFormOpen(true)}
      >
        Add New User
      </button>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <UserList users={users} onSelectUser={setSelectedUser} />
        </div>
        <div className="w-1/3">
          {selectedUser && (
            <UserCard
              user={selectedUser}
              onEdit={() => setIsFormOpen(true)}
              onDelete={() => handleDeleteUser(selectedUser.id)}
            />
          )}
        </div>
      </div>
      {isFormOpen && (
        <UserForm
          user={selectedUser || undefined}
          onSubmit={(userData) => {
            if (selectedUser) {
              handleUpdateUser(selectedUser.id, userData)
            } else {
              handleCreateUser(userData)
            }
          }}
          onCancel={() => {
            setIsFormOpen(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

export default UsersPage

