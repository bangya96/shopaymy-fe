// GraphQL Types - matching the API schema

export interface User {
    id: number;
    name: string;
    email: string;
    emailVerifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    shops?: Shop[];
}

export interface Shop {
    id: number;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    banner?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
    pages?: Page[];
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
}

// Auth Types
export interface AuthResponse {
    token: string;
    user: User;
}

export interface LogoutResponse {
    message: string;
}

// Input Types
export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface CreateShopInput {
    name: string;
    description?: string;
    logo?: string;
    banner?: string;
}

export interface UpdateShopInput {
    id: number;
    name: string;
    description?: string;
    logo?: string;
    banner?: string;
    isActive?: boolean;
}

export interface CreatePageInput {
    shopId: number;
    title: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface UpdatePageInput {
    id: number;
    title: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
    isActive?: boolean;
}

// Query Response Types
export interface MeQueryResponse {
    me: User;
}

export interface ShopsQueryResponse {
    shops: Shop[];
}

export interface ShopQueryResponse {
    shop: Shop;
}

export interface PagesQueryResponse {
    pages: Page[];
}

export interface PageQueryResponse {
    page: Page;
}

// Mutation Response Types
export interface LoginMutationResponse {
    login: AuthResponse;
}

export interface RegisterMutationResponse {
    register: AuthResponse;
}

export interface LogoutMutationResponse {
    logout: LogoutResponse;
}

export interface CreateShopMutationResponse {
    createShop: Shop;
}

export interface UpdateShopMutationResponse {
    updateShop: Shop;
}

export interface DeleteShopMutationResponse {
    deleteShop: boolean;
}

export interface CreatePageMutationResponse {
    createPage: Page;
}

export interface UpdatePageMutationResponse {
    updatePage: Page;
}

export interface DeletePageMutationResponse {
    deletePage: boolean;
}
