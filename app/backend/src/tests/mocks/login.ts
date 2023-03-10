const getbyEmailResult = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  
  const validLoginRequest = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  
  const wrongPasswordLoginRequest = {
    email: 'admin@admin.com',
    password: 'wrong_passowrd',
  }
  
  const invalidEmailLoginRequest = {
    email: 'admin.admin.com',
    password: 'secret_admin',
  }
  
  const noEmailLoginRequest = {
    password: 'secret_admin',
  }
  
  const noPasswordLoginRequest = {
    email: 'admin@admin.com',
  }
  
  const validLoginResponse = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2OTkxOTQyLCJleHAiOjE2Njc1OTY3NDJ9.K232KWmOi-PahqevKYpn7MGW33Q3JXlNKB0Pcs5RYxQ'
  }
  
  const brokenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NzE1ODg2LCJleHAiOjE2NjczMjA2ODZ9.m8NIfjv48xLchUjezyIFn0pX4Ix691K5j0'
  
  export {
    getbyEmailResult,
    validLoginRequest,
    wrongPasswordLoginRequest,
    invalidEmailLoginRequest,
    noEmailLoginRequest,
    noPasswordLoginRequest,
    validLoginResponse,
    brokenToken,
  };