class UserDto {

    constructor(first_name, last_name, username, password, address, email, phone_number) {
        this.first_name = first_name
        this.last_name = last_name
        this.username = username
        this.password = password
        this.address = address
        this.email = email
        this.phone_number = phone_number
    }
}

module.exports = UserDto
