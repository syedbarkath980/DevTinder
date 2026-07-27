# DEV-TINDER API/ROUTES LIST:

## authRouter
- POST      /signup  ✔️
- POST      /login   ✔️
- POST      /logout  ✔️

## userRouter
- GET     /user/profile  ✔️
- GET     /feed
- GET     /user/messages
- GET     /user/connections 
- PATCH   /user/updateProfile  ✔️
- PATCH   /user/updatePassword
- DELETE  /profile  ✔️


## connectionRouter
- POST    /connection/dislike/:userId
- POST    /connection/like/:userId

## Statuses :
i.  on right swipe = interested
ii. on left swipe = pass