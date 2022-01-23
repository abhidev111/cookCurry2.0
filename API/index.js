const express = require("express");
const pool = require("./db");
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(express.json());
app.use(cors());
const PORT = process.env.APPPORT || 3000;
app.listen(PORT, () => {
    console.log("Running on port", PORT);
})


app.get("/getAll", async (req, res) => {
    try {
        const allRecipes = await pool.query("select * from full_recipe_table;");

        res.send(allRecipes)
    } catch (error) {

    }
})



app.post("/addRecipe", async (req, res) => {
    try {
        const { recipe_name } = req.body;
        const { c_type } = req.body;
        const { recipe_id } = req.body;
        const new_recipe = await pool.query("INSERT INTO recipe_table (recipe_id,recipe_name,c_type) VALUES ($1,$2,$3) RETURNING *", [recipe_id, recipe_name, c_type]);

        console.log(recipe_name, c_type);
        res.status(200);
        res.send(new_recipe.rows);
        // res.json(new_recipe);
    } catch (error) {
        console.log(error.message);
    }

})

//all recipes with given condition
app.get("/allrecipeNames:data", async (req, res, err) => {

    try {

        let { data } = req.params;
        data = data.split(':');
        console.log("--->", data)

        let recipeName = "%" + data[0].replace(/ /g, "%") + "%";
        let cuisineArr = data[1];
        let dietArr = data[2];
        let courseArr = data[3];

        console.log(recipeName, cuisineArr, dietArr, courseArr);

        cuisineArr = cuisineArr.split(',')
        for (var i = 0; i < cuisineArr.length; i++) {
            cuisineArr[i] = "%" + cuisineArr[i] + "%";
            console.log("eyy", cuisineArr[i]);
        }

        dietArr = dietArr.split(',')
        for (var i = 0; i < dietArr.length; i++) {
            dietArr[i] = "%" + dietArr[i] + "%";
            console.log("eyy", dietArr[i]);
        }

        courseArr = courseArr.split(',')
        for (var i = 0; i < courseArr.length; i++) {
            courseArr[i] = "%" + courseArr[i] + "%";
            console.log("eyy", courseArr[i]);
        }
        /*
        SELECT ft.srno,ft.recipename,ft.ingredients,csnt.cuisinename,crst.coursename,dit.dietname 
FROM full_recipe_table AS ft, full_course_types AS crst, full_cuisine_types AS csnt, full_diet_types AS dit 
WHERE (ft.recipename ILIKE $1
	   AND csnt.cuisinename ILIKE any($2)  
	   AND dit.dietname ILIKE any($3) 
	   AND crst.coursename ILIKE any($4) 
	   AND ft.recipediet=dit.dietref 
	   AND ft.recipecourse=crst.courseref
	   AND ft.recipecuisine=csnt.cuisineref
	  );
        */ 

        const allrecipeNames = await pool.query("SELECT ft.srno,ft.recipename,ft.ingredients,ft.instructions,ft.url,ft.image_links,csnt.cuisinename,crst.coursename,dit.dietname FROM full_recipe_table AS ft, full_course_types AS crst, full_cuisine_types AS csnt, full_diet_types AS dit WHERE ( ft.recipediet=dit.dietref AND ft.recipecourse=crst.courseref AND ft.recipecuisine=csnt.cuisineref AND ft.recipename ILIKE $1 AND csnt.cuisinename ILIKE any($2)  AND dit.dietname ILIKE any($3) AND crst.coursename ILIKE any($4)  );", [recipeName, cuisineArr, dietArr, courseArr]);
        console.log(allrecipeNames)
        res.send(allrecipeNames.rows);
    } catch (error) {
        console.log(err);
    }
})




app.get('/RecipeNamesDisplay', async (req, res) => {
    try {
        const RecipeNames = await pool.query("SELECT recipe_name FROM full_recipe_names order by recipe_name asc;");
        res.send(RecipeNames.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get('/recipeWithName:recipeName', async (req, res, err) => {
    try {
        let { recipeName } = req.params;
        recipeName = recipeName.replace(/ /g, "%");
       
        const q = '%' + recipeName + '%'
        console.log(q)
       
        const recipeDetails = await pool.query("select * from full_recipe_table_with_image where recipename ilike $1 order by recipename,ingredients asc;", [q]);
        console.log(recipeDetails.rows)
        res.send(recipeDetails.rows);
    } catch (error) {
        console.log(err)
    }



})

//get all cuisines
app.get('/getAllcuisines', async (req, res) => {
    try {
        let cuisines = await pool.query("Select cuisinename from full_cuisine_types");
        res.send(cuisines.rows);
    } catch (error) {
        console.log(error);
    }

})
//get all diet
app.get('/getAlldiet', async (req, res) => {
    try {
        let diet = await pool.query("Select dietname from full_diet_types");
        res.send(diet.rows);
    } catch (error) {
        console.log(error);
    }

})

//get all course
app.get('/getAllcourse', async (req, res) => {
    try {
        let course = await pool.query("SELECT coursename FROM full_course_types");
        res.send(course.rows);
    } catch (error) {
        console.log(error);
    }

})

app.get('/getAllIngredients', async (req, res) => {
    try {
        let ingredients = await pool.query("SELECT ingredient_name FROM ingredientsname");
        res.send(ingredients.rows);
    } catch (error) {
        console.log(error);
    }

})

app.post('/allrecipeNamesWithIngredients', async (req, res) => {
    try {
        let { ingredientsArr, cuisineArr, dietArr, courseArr } = req.body;
        console.log(ingredientsArr, cuisineArr, dietArr, courseArr);


        for (var i = 0; i < ingredientsArr.length; i++) {
            ingredientsArr[i] = ingredientsArr[i].replace(/ /g, "%");
            ingredientsArr[i] = "%" + ingredientsArr[i] + "%";
            console.log("eyy", ingredientsArr[i]);
        }

        // cuisineArr= cuisineArr.split(',')
        if (cuisineArr.length == 0) {
            cuisineArr.push("%%")
        }
        else
            for (var i = 0; i < cuisineArr.length; i++) {
                cuisineArr[i] = "%" + cuisineArr[i] + "%";
                console.log("eyy", cuisineArr[i]);
            }

        // dietArr= dietArr.split(',')
        if (dietArr.length == 0) {
            dietArr.push("%%")
        }
        else
            for (var i = 0; i < dietArr.length; i++) {
                dietArr[i] = "%" + dietArr[i] + "%";
                console.log("eyy", dietArr[i]);
            }

        // courseArr= courseArr.split(',')
        if (courseArr.length == 0) {
            courseArr.push("%%")
        }
        else
            for (var i = 0; i < courseArr.length; i++) {
                courseArr[i] = "%" + courseArr[i] + "%";
                console.log("eyy", courseArr[i]);
            }
        console.log(ingredientsArr)
        /*
        SELECT ft.srno,ft.recipename,ft.ingredients,ft.url,ft.image_links,csnt.cuisinename,crst.coursename,dit.dietname FROM full_recipe_table AS ft, full_course_types AS crst, full_cuisine_types AS csnt, full_diet_types AS dit WHERE ( ft.recipediet=dit.dietref AND ft.recipecourse=crst.courseref AND ft.recipecuisine=csnt.cuisineref AND ft.recipename ILIKE all($1) AND csnt.cuisinename ILIKE any($2)  AND dit.dietname ILIKE any($3) AND crst.coursename ILIKE any($4)  );
        */

        const allrecipeNames = await pool.query("SELECT ft.srno,ft.recipename,ft.ingredients,ft.url,ft.image_links,csnt.cuisinename,crst.coursename,dit.dietname FROM full_recipe_table AS ft, full_course_types AS crst, full_cuisine_types AS csnt, full_diet_types AS dit WHERE ( ft.recipediet=dit.dietref AND ft.recipecourse=crst.courseref AND ft.recipecuisine=csnt.cuisineref AND ft.ingredients ILIKE all($1) AND csnt.cuisinename ILIKE any($2)  AND dit.dietname ILIKE any($3) AND crst.coursename ILIKE any($4)  );", [ingredientsArr, cuisineArr, dietArr, courseArr]);
        console.log(allrecipeNames.rows);
        res.send(allrecipeNames.rows);

    } catch (error) {
        console.log("error logging", error);
    }

})

app.get('/getDetailedRecipeWithSrNo/:srno', async (req, res) => {
    try {
        const srno = req.params.srno;
        console.log(srno)
        const detailRecipe = await pool.query("SELECT ft.srno,ft.recipename,ft.ingredients,ft.instructions,ft.url,ft.image_links,csnt.cuisinename,crst.coursename,dit.dietname FROM full_recipe_table AS ft, full_course_types AS crst, full_cuisine_types AS csnt, full_diet_types AS dit WHERE ( ft.recipediet=dit.dietref AND ft.recipecourse=crst.courseref AND ft.recipecuisine=csnt.cuisineref AND ft.srno=$1  )", [srno]);
        console.log(detailRecipe.rows[0]);
        res.send(detailRecipe.rows[0]);
    } catch (error) {
        console.log(error);
    }
})





// app.get("/allrecipeNames/:recipeName/:cuisineArray?",async (req,res,err)=>{

//     try {

//         let cuisineArray = req.params.cuisineArray; 
//         let recipeName = req.params.recipeName;
//         console.log(cuisineArray,recipeName)
//         recipeName ="%"+ recipeName.replace(/ /g, "%")+"%";
//         // Rname = Rname.replace(/ /g, "%");
//         console.log(cuisineArray,recipeName);
//         cuisineArray= cuisineArray.split(',')
//         for(var i =0 ; i< cuisineArray.length;i++){
//             cuisineArray[i] = "%"+ cuisineArray[i] +"%";
//             console.log("eyy",cuisineArray[i]);
//         }
//         console.log(cuisineArray)

//         const allrecipeNames = await pool.query("select * from full_recipe_table where (cuisine ilike any($1) AND recipename ilike $2);",[cuisineArray,recipeName]);
//         res.send(allrecipeNames.rows);
//     } catch (error) {
//         console.log(err);
//     }
// })