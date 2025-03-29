import axios, { AxiosError } from "axios"
import { apiUrl } from "../../App";
import { ChangePwd, RegistrationError, User, UserEdit, UserLogin, UserRegister, UsersPage } from "./type";



export const register = async (user: UserRegister): Promise<string> => {
    try {
        console.log({
            username: user.username,
            email: user.email,
            password: user.password,
        });

        const res = await axios.post(
            `${apiUrl}/api/v1/auth/registration`,
            {
                "username": user.username,
                "email": user.email,
                "password": user.password,

            },
            { headers: { "Content-Type": "application/json" },withCredentials: true, },
        )
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            const responseData = axiosError.response?.data as RegistrationError
            if (responseData && responseData.errors) {
                const firstErrorKey = Object.keys(responseData.errors)[0]
                throw new Error(
                    "Registration failed! " + responseData.errors[firstErrorKey],
                )
            } else {
                throw new Error("Registration failed! Reason unknown")
            }
        } else {
            throw error
        }
    }
}

export async function emailConfirm(emailDto: string): Promise<User> {
    try {
        const response = await axios.get(`${apiUrl}/api/v1/auth/email/${emailDto}`,
            {
                headers: { "content-type": "application/json" },
            },
        );

        const user: User = response.data;
        console.log(response);

        return user;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to confirm email');
    }
}


export async function loginUser(login: UserLogin): Promise<User> {
    try {
        const res = await axios.post(
            `${apiUrl}/api/v1/auth/login`,
            {
                "username": login.username,
                "password": login.password,
            },
            {
                headers: { "content-type": "application/json" },
                withCredentials: true, // ✅ Обязательно для работы с куками!
            },
        );
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        } else {
            throw error;
        }
    }
}


export async function userLogout() {
    const res = await axios.get(`${apiUrl}/api/v1/auth/logout`, {
        withCredentials: true, // ✅ Передача кук в запросе
    });
    return res.data;
}

export async function fechUserAuth(): Promise<User> {
    const res = await axios.get(`${apiUrl}/api/v1/users/me`, {
        withCredentials: true, // ✅ Без этого куки не передаются
    });
    console.log(res.data);
    return res.data;
}


export async function fechAllUsersPagination(page?: number, size?: number): Promise<UsersPage> {
    const res = await axios.get(`${apiUrl}/api/v1/users?page=${page}&size=${size}`, {})
    return res.data
}

export async function fechAllUsers(): Promise<UsersPage> {
    const res = await axios.get(`${apiUrl}/api/v1/users`, {})
    return res.data
}

export async function fechUserId(userId: string): Promise<User> {
    const res = await axios.get(`${apiUrl}/api/v1/users/${userId}`, {})
    return res.data
}

export async function removeUserId(userId: string): Promise<User> {
    const res = await axios.delete(`${apiUrl}/api/v1/users/${userId}`, {})
    return res.data
}

export const updateUserAccount = async (user: UserEdit): Promise<User> => {
    try {
        console.log({
            user
        });

        const res = await axios.put(
            `${apiUrl}/api/v1/users/${user?.userId}`,
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telefon: user.telefon,
            },
            { headers: { "Content-Type": "application/json" } },
        )
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            const responseData = axiosError.response?.data as RegistrationError
            if (responseData && responseData.errors) {
                const firstErrorKey = Object.keys(responseData.errors)[0]
                throw new Error(
                    "Registration failed! " + responseData.errors[firstErrorKey],
                )
            } else {
                throw new Error("Registration failed! Reason unknown")
            }
        } else {
            throw error
        }
    }
}

export async function fechNewPwd(obj: ChangePwd) {
    const headers = {
        "Content-Type": "application/json",
        "x-password": `${obj.password2}`,
    }
    const res = await axios.put(
        `${apiUrl}/api/v1/users/${obj.userId}/password`,
        {},
        { headers },
    )
    return res.data
}

export async function fechUserByEmail(userEmail: string): Promise<User> {
    const res = await axios.get(
        `${apiUrl}/api/v1/users/email/${userEmail}`,
        {},
    )
    return res.data
}
