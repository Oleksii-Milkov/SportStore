import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './main/orders/orders.component';
import { ProductsComponent } from './main/products/products.component';
import { CreateComponent } from './main/products/create/create.component';
import { ListComponent } from './main/products/list/list.component';
import { EditComponent } from './main/products/edit/edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { InformingDirective } from './main/informing.directive';

@NgModule({
    declarations: [AuthComponent, MainComponent, OrdersComponent, ProductsComponent, CreateComponent, ListComponent, EditComponent, InformingDirective],
    imports: [
        CommonModule, RouterModule.forChild([
            {
                path: "admin/auth",
                component: AuthComponent
            },
            {
                path: "admin/main",
                component: MainComponent,
                /* canActivate: [AuthGuard], */
                children: [
                    {
                        path: "", pathMatch: "full",
                        redirectTo: "products"
                    },
                    {
                        path: "orders",
                        component: OrdersComponent
                    },
                    {
                        path: "products",
                        component: ProductsComponent,
                        children: [
                            {
                                path: "",
                                component: ListComponent
                            },
                            {
                                path: "create",
                                component: CreateComponent
                            },
                            {
                                path: "edit/:id",
                                component: EditComponent
                            }
                        ]
                    }
                ]
            }
        ]), ReactiveFormsModule
    ]
})
export class AdminModule { }
