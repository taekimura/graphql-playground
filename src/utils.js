function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer', '');
      if (!token) {
        throw new Error('No token');
      }
    }
  }
}
