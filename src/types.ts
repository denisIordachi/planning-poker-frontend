export type User = {
  id: string;
  name: string;  
  vote?: string; 
};

export type Room = {
  id: string;
  users: User[];
  revealed: boolean;
};
