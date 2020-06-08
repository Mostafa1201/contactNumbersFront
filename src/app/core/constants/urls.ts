import { environment } from "../../../environments/environment";

/**
 * @example http://localhost:3000/
 */
const BASE_URL = environment.BASE_URL;

/**
 * @example http://localhost:3000/api/
 */
const API_URL = environment.API_URL;

export default {
    auth: {  
        login: API_URL + "auth/login",
    }
}