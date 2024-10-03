
export interface User {
    id: number;                     
    name: string;                   
    email: string;                  
    password: string;               
    role: 'user' | 'admin';         
    created_at?: string;       
    activada:  0 | 1;     
}
