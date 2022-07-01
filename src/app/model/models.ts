

export class LoginDto {
  public email!: string;
  public password!: string;
}

export class Token{
    public AccessToken!: string;
    public Expiration!: Date;
    public RefreshToken!: string;
}

export class LoginResponseDto {
  public AccessToken!: string;
    public Expiration!: Date;
    public RefreshToken!: string;
    public UserDto!:UserDto;
}

export class UserDto
{
      Id !:number;
      Name !:string;
      Surname !:string;
      Email !:string;
      Password !:string;
      UserTypeId !:number;
      UserTypeName !:string;
}

export class DepartmentDto{
  public DepartmentName!: string;
  public DepartmentId!: number;
}

export class Department{
  public DepartmentName!: string;
  public DepartmentId!: number;
}

export class PersonDto{
    public Id!: number;
    public Name!: string;
    public SurName!: string;
    public PhoneNumber!: string;
    public InternalNumber!: string;
    public DepartmentId!: number;
    public TitleId!: number;

}
export class Person{
  public Id!: number;
  public Name!: string;
  public SurName!: string;
  public PhoneNumber!: string;
  public InternalNumber!: string;
  public DepartmentId!: number;
  public TitleId!: number;
  
}
export class Title{
  public TitleName!: string;
  public Order!: number;
  public Id!: number;
}
export class TitleDto{
  public TitleName!: string;
  public Order!: number;
  public Id!: number;
  public DepartmentIdlist!: number;
}