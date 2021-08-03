import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  locationType: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
