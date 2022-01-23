export interface ingredient{
    ing_name:string;
}

export interface recipeName{
    regexp_replace:String;
}

export interface ingredientsType{
    ingredients:String;
}

export interface cuisineType{
    cuisinename:String;
}
export interface dietType{
    cuisinename:String;
}
export interface courseType{
    cuisinename:String;
}

export interface recipeDetails{
    srno :number,
    recipename:string,
    ingredients:string,
    preptimeinmins:number,
    cooktimeinmins:number,
    cuisinename:string,
    coursename:string,
    dietname:string,
    instructions:string,
    url:string,
    image_links:string
}
