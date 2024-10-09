export const ROLES = {
    SUPER_USER: 'SuperUser',
    ADMIN: 'Admin',
    USER: 'User',
};

export const USER_ROLES_ALLOW_EDIT = [ROLES.SUPER_USER, ROLES.ADMIN];
export const USER_ROLES_ADMIN_DASHBOARD = USER_ROLES_ALLOW_EDIT;
export const USER_ROLES_READ_ONLY = [ROLES.USER];
