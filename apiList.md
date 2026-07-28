# DEV-TINDER API/ROUTES LIST:

## authRouter
- POST      /signup  ✔️
- POST      /login   ✔️
- POST      /logout  ✔️

## userRouter
- GET     /user/profile  ✔️
- GET     /feed
- GET     /user/messages
- PATCH   /user/updateProfile  ✔️
- PATCH   /user/updatePassword
- DELETE  /profile  ✔️


## ConnectionsRequestRouter:
- POST    /request/send/:status/:userid        (Status can be either liked | disliked)  ✔️
- POST    /request/review/:status/:requestId   (Status can be either accept | reject)   ✔️

## Statuses Can Be:
i.  on right swipe = liked
ii. on left swipe = disliked
iii. on received(liked) request = accepted
iv. on received(liked) request = rejected


## ConnectionsReviewRouter:
- GET     /user/myConnections
- GET     /user/connetionRequests 

