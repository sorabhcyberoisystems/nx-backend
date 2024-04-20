export interface PostSignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  nationality: string;
  residence: string;
}

export interface SignupResponse {
  message: string;
}