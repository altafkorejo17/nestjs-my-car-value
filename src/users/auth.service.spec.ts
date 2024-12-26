import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async() => {
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>  Promise.resolve({id: 1, email, password} as User)
        };
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();
    
        service = module.get(AuthService);
    });
    
    it('can create a instance of an auth service', async () => {
        expect(service).toBeDefined();
    })

    it("create a new user with salted and hashed password", async() => {
        const user = await service.signup("abc@demo.com", 'assdfsd');
        const [salt, hash] = user.password.split('.'); 
        expect(user.password).not.toEqual('assdfd');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error when user signun with email that already in use', async (done) => {
        try {
            fakeUserService.find = () => Promise.resolve([ {id: 1, email: 'a', password: '1'} as User ]);
        } catch(err) {
            done();
        }
    });

    // it('Thorws if sign in called with an un-used email', async(done) => {
    //     try {
    //         await service.signin("adbc@dsdfsdemo.com", 'hellsdfsdo');
    //     } catch(err) {
    //         done();
    //     }
    // });
});
