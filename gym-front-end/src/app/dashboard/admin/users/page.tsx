"use client";
import UserTableForAdmin from "@/components/users/userTable";
import { withAuth } from "@/HOC/withAuth";

function UserListAdmin() {

    return (
        <>
            <div>
                <UserTableForAdmin />
            </div>
        </>
    );
}

export default withAuth(UserListAdmin, [1]);