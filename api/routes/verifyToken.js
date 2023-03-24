const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token // get token from
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json('Token is not valid')
            req.user = user
            next()
        })
    }else {
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            res.status(403).json("you are not allowed to do that")
        }
    })
}
// Đoạn code trên đang xây dựng một hệ thống xác thực token trong ứng dụng, 
// bao gồm hai hàm chính: verifyToken và verifyTokenAndAuthorization.

// Hàm verifyToken được sử dụng để xác thực token được gửi kèm trong header của request. 
// Nó trích xuất token từ header, sau đó sử dụng JWT để giải mã token và lấy thông tin user. 
// Nếu token không hợp lệ, nó sẽ trả về một response với mã lỗi 403. 
// Nếu token hợp lệ, nó sẽ lưu thông tin user vào request và gọi hàm callback next() để tiếp tục xử lý request.

// Hàm verifyTokenAndAuthorization sử dụng hàm verifyToken để xác thực token và lưu thông tin user vào request. 
// Sau đó, nó kiểm tra xem user có quyền truy cập vào tài nguyên được yêu cầu hay không. 
// Nếu user có ID giống nhau hoặc user là admin, hàm callback next() được gọi để tiếp tục xử lý request. 
// Nếu không, nó sẽ trả về một response với mã lỗi 403.
// Check if user is admin
const verifyTokenAndAdmin= (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin) {
            next()
        }else {
            res.status(403).json("you are not allowed to do that")
        }
    })
}


module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}