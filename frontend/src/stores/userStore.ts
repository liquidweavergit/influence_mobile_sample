import create from "zustand";
import {User, initialUser, BACKEND_BASE_URL, EMAIL_REGEX} from "../types/user";
import axios from "axios";

type UserStore = {
  user: User;
  message: string;
  errors: string[];
  loading: boolean;
  getAccessToken: () => string | null;
  refreshToken: string | null;
  createUser: () => void;
  fetchUser: () => void;
  updateUser: () => void;
  login: () => void;
  logout: () => void;
  updateAttribute: (attributeName: string, value: any) => void;
  validateUser: (type?: string) => boolean;
  resetUser: () => void;
};

const userStore = create<UserStore>((set, get) => ({
  user: initialUser,
  message: '',
  errors: [],
  loading: false,
  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },
  refreshToken: null,
  createUser: async () => {
    const user = get().user;

    if (!get().validateUser('registration')) {
      return;
    }

    set({
      loading: true
    });

    let response;
    try {
      response = await axios.post(`${BACKEND_BASE_URL}/signup`,
        {
          user
        });
    } catch(e: any) {
      set({
        errors: [e.response.data.message],
        loading: false
      });
      return;
    }

    const message = response.data.message;
    const errors = response.data.errors;
    const newUser = response.data.user;
    newUser.password = '';

    set({
      loading: false,
      message,
      errors,
      user: newUser,
    });
  },
  fetchUser: async () => {
    set({
      loading: true
    });

    let response;
    try {
      response = await axios.get(`${BACKEND_BASE_URL}/users/${localStorage.getItem('userId')}.json`,
        {
          headers: {
            'authorization': `Bearer ${get().getAccessToken()}`,
          }
        });
    } catch(e: any) {
      set({
        errors: [e.response.data.message],
        loading: false
      });
      return;
    }

    const message = response.data.message;
    const errors = response.data.errors;
    const user = response.data.user;

    set({
      loading: false,
      message,
      errors,
      user
    });
  },
  updateUser: async () => {
    const user = get().user;

    set({
      loading: true
    });

    let response;
    try {
      response = await axios.patch(`${BACKEND_BASE_URL}/users/${user.id}.json`,
        {
          user
        },
        {
          headers: {
            'authorization': `Bearer ${get().getAccessToken()}`,
          }
        });
    } catch(e: any) {
      set({
        errors: [e.response.data.message],
        loading: false
      });
      return;
    }

    const message = response.data.message;
    const errors = response.data.errors;
    const newUser = response.data.user;

    set({
      loading: false,
      message,
      errors,
      user: newUser
    });
  },
  login: async () => {
    const user: User = get().user;

    if (!get().validateUser()) {
      return;
    }

    set({
      loading: true,
    });

    let response;

    try {
      response = await axios.post(`${BACKEND_BASE_URL}/login`, {
        user: {
          email: user.email,
          password: user.password
        }
      });
    } catch(e: any) {
      set({
        errors: [e.response.data.message],
        loading: false
      });
      return;
    }

    const message = response.data.message;
    const errors = response.data.errors;
    const newUser = response.data.user;

    const accessToken = response.headers.authorization.split(' ')[1];
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', newUser.id);

    set({
      loading: false,
      message,
      errors,
      user: newUser,
    });
  },
  logout: async () => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/logout.json`,
        {
          headers: {
            'authorization': `Bearer ${get().getAccessToken()}`,
          }
        });
    } catch (e) {
      console.log("Error logging out! ", e);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    set({
      user: initialUser,
      loading: false,
      errors: [],
    })
  },
  updateAttribute: (attributeName, value) => {
    const user = get().user;

    if (user.hasOwnProperty(attributeName)) {
      set({
        user: ({ ...user, [attributeName]: value }),
      });
    }
  },
  validateUser: (type = 'login') => {
    const user = get().user;
    let errors: string[] = [];

    if (!EMAIL_REGEX.test(user.email)) {
      errors.push('Email address is not valid');
    }

    if (type === 'registration') {
      if (user.first_name === '') {
        errors.push('First Name is required.');
      }

      if (user.last_name === '') {
        errors.push('Last Name is required.');
      }

      if (user.birthdate === '') {
        errors.push('Your birthday is required.');
      }

      if (user.gender === '') {
        errors.push('Please indicate your identified gender.');
      }

      if (user.password_confirmation && user.password_confirmation.length > 0) {
        if (user.password !== user.password_confirmation) {
          errors.push('Passwords must match');
        }
      }
    }

    set({
      errors,
    });

    return errors.length === 0;
  },
  resetUser: () => {
    set({
      user: initialUser,
      errors: [],
    })
  },
}));

export default userStore;
