# DEV-TINDER API/ROUTES LIST:

## authRouter
- POST      /signup  ✔️
- POST      /login   ✔️
- POST      /logout  ✔️

## profileRouter
- GET     /profile  ✔️
- DELETE  /profile/delete  ✔️
- PATCH   /updateProfile  ✔️
- PATCH   /updatePassword


## ConnectionsRequestRouter
- POST    /request/send/:status/:userid        (Status = liked | disliked)  ✔️
- POST    /request/review/:status/:requestId   (Status = accept | reject)   ✔️


## ConnectionsViewRouter
- GET     /user/myConnections        ✔️ 
- GET     /user/connetionRequests    ✔️ 


## userRouter
- GET     /feed

