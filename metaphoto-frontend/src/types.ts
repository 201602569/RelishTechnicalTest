export interface User {
    id: number;
    email: string;
  }
  
  export interface Album {
    id: number;
    title: string;
    userId: number;
    user?: User;
  }
  
  export interface Photo {
    id: number;
    title: string;
    url: string;
    albumId: number;
    album?: Album;
    userId?: number;
    user?: User;
  }
  