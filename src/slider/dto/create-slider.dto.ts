import { ApiProperty } from "@nestjs/swagger";

export class CreateSliderDto {
    @ApiProperty()
    sliderImage: string;
}
