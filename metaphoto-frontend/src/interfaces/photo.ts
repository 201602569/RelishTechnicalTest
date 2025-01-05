interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  interface Album {
    id: number;
    title: string;
    user: User;
  }
  
  export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: Album;
  }