import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      const passCheck = await this.passwordsAreEqual(user.password, pass);
      if (user && passCheck) {
        const { password, ...result } = user;
        console.log(user);

        return result;
      }
      return null;
    }
  
    async login(user: any) {
      user = user.user
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        role: user.role,
        username: user.username
      };
    }

    private async passwordsAreEqual(
      hashedPassword: string,
      plainPassword: string
    ): Promise<boolean> {
      const bcrypt = require('bcrypt');
      bcrypt.hash(plainPassword, 10).then(function(hash) {
        console.log(hash);
    });
     return await bcrypt.compare(plainPassword, hashedPassword);
    }
}