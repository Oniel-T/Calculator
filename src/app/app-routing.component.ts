import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router'

import { CalculatorComponent } from './calculator/calculator.component';
import { ConvertorComponent } from './convertor/convertor.component';

const routes: Routes = [
    { path:'calculator', component:CalculatorComponent},
    { path:'converter', component:ConvertorComponent},
    { path:'', component:CalculatorComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule { }
