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

// ============================================
// Product Types
// ============================================

export interface Product {
    id: number;
    shopId: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    currency: string;
    sku?: string;
    images?: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductInput {
    shopId: number;
    name: string;
    description?: string;
    price: number;
    currency?: string;
    sku?: string;
    images?: string[];
}

export interface UpdateProductInput {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    sku?: string;
    images?: string[];
    isActive?: boolean;
}

export interface ProductsQueryResponse {
    products: Product[];
}

export interface ProductQueryResponse {
    product: Product;
}

export interface CreateProductMutationResponse {
    createProduct: Product;
}

export interface UpdateProductMutationResponse {
    updateProduct: Product;
}

export interface DeleteProductMutationResponse {
    deleteProduct: boolean;
}

// ============================================
// Order Form Types
// ============================================

export type FormFieldType = 'text' | 'email' | 'phone' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';

export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    required: boolean;
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
}

export interface OrderForm {
    id: number;
    shopId: number;
    pageId?: number;
    productId?: number;
    name: string;
    fields: FormField[];
    successMessage?: string;
    redirectUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOrderFormInput {
    shopId: number;
    pageId?: number;
    productId?: number;
    name: string;
    fields: FormField[];
    successMessage?: string;
    redirectUrl?: string;
}

export interface UpdateOrderFormInput {
    id: number;
    name?: string;
    fields?: FormField[];
    successMessage?: string;
    redirectUrl?: string;
    isActive?: boolean;
}

export interface OrderFormsQueryResponse {
    orderForms: OrderForm[];
}

export interface OrderFormQueryResponse {
    orderForm: OrderForm;
}

export interface CreateOrderFormMutationResponse {
    createOrderForm: OrderForm;
}

export interface UpdateOrderFormMutationResponse {
    updateOrderForm: OrderForm;
}

export interface DeleteOrderFormMutationResponse {
    deleteOrderForm: boolean;
}

// ============================================
// Order Types
// ============================================

export type OrderStatus = 'pending' | 'awaiting_payment' | 'paid' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type PaymentGateway = 'billplz' | 'toyyibpay' | 'senangpay' | 'chipin';

export interface Order {
    id: number;
    shopId: number;
    orderFormId?: number;
    productId?: number;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    amount: number;
    currency: string;
    status: OrderStatus;
    paymentGateway?: PaymentGateway;
    paymentReference?: string;
    paymentUrl?: string;
    formData?: Record<string, any>;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ShopOrderStats {
    totalOrders: number;
    pendingOrders: number;
    paidOrders: number;
    totalRevenue: number;
}

export interface OrdersQueryResponse {
    orders: Order[];
}

export interface OrderQueryResponse {
    order: Order;
}

export interface ShopOrderStatsQueryResponse {
    shopOrderStats: ShopOrderStats;
}

// ============================================
// Payment Gateway Settings Types
// ============================================

export interface PaymentGatewaySettings {
    id: number;
    shopId: number;
    gateway: PaymentGateway;
    isActive: boolean;
    isSandbox: boolean;
    credentials?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentGatewaySettingsQueryResponse {
    paymentGatewaySettings: PaymentGatewaySettings[];
}

// ============================================
// Shop Member & Invitation Types
// ============================================

export type ShopRole = 'owner' | 'admin' | 'staff';
export type InvitationStatus = 'pending' | 'accepted' | 'cancelled' | 'expired';

export interface ShopMember {
    userId: number;
    shopId: number;
    role: ShopRole;
    user?: User;
    createdAt: Date;
}

export interface ShopInvitation {
    id: number;
    shopId: number;
    email: string;
    role: ShopRole;
    status: InvitationStatus;
    token: string;
    expiresAt: Date;
    createdAt: Date;
}

export interface ShopMembersQueryResponse {
    shopMembers: ShopMember[];
}

export interface ShopInvitationsQueryResponse {
    shopInvitations: ShopInvitation[];
}

export interface InviteToShopMutationResponse {
    inviteToShop: ShopInvitation;
}

export interface AcceptInvitationMutationResponse {
    acceptInvitation: boolean;
}

export interface CancelInvitationMutationResponse {
    cancelInvitation: boolean;
}
