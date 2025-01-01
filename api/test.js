import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);
const n_Password = bcrypt.hashSync("d5", salt);

console.log(n_Password);


// update driver_table set D_Current_Location_lat = 28.54792, D_Current_Location_long = 77.27158 where Driver_ID = 2;
// update driver_table set D_Current_Location_lat = 28.54715, D_Current_Location_long = 77.27139 where Driver_ID = 3;
// update driver_table set D_Current_Location_lat = 28.54660, D_Current_Location_long = 77.27503 where Driver_ID = 4;
// update driver_table set D_Current_Location_lat = 28.54497, D_Current_Location_long = 77.27323 where Driver_ID = 5;

// select D_Current_Location_lat, D_Current_Location_long from 
//     (select Driver_ID from driver_table where (28.54741 - D_Current_Location_lat)*(28.54741 - D_Current_Location_lat)
//      + (77.27340 - D_Current_Location_long) * (77.27340 - D_Current_Location_long) <= 2*0.015060*2*0.015060 
//     ) as t
//     natural join Driver_Table;


    // 77.27340,28.54741    --- current 