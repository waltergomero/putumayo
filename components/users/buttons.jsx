import {
    PencilIcon,
    PlusIcon,
    TrashIcon,
    XCircleIcon
  } from "@heroicons/react/24/outline";
  import Link from "next/link";
  import { deleteUser } from "@/actions/user-actions";
  import { Button } from "@/components/ui/button";
  
  export function CreateUser() {
    return (
      <Link
        href="/admin/users/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add New User</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }
  
  export function UpdateUser({ id }) {
    return (
      <Link
        href={`/admin/users/${id}/edit`}
      >
        <PencilIcon className="w-5 text-blue-500" />
      </Link>
    );
  }
  
  export function DeleteUser({ id }) {
    const deleteUserWithId = deleteUser.bind(null, id);
    return (
      <form action={deleteUserWithId}>
        <button >
          <TrashIcon className="w-5 text-rose-500"/>
        </button>
      </form>
    );
  }
  
  export function CancelUser() {
    return (
      <Link
        href="/admin/users"
        className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      >
        <span className="hidden md:block">Cancel</span>{" "}
        <XCircleIcon className="h-6 md:ml-4" />
      </Link>
    );
  }
  
  export function SaveUserBtn() {
    return (
      <Button type="submit" 
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Save</span>
        <PlusIcon className="h-6 md:ml-4" />
      </Button>
    );
  }