import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    nama: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    product_image: string;

    @ApiProperty()
    seller_id: number;


}
