module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ca06a3d1e9672ccc0fa87422e6706b3e'),
  },
});
