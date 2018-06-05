import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {RegisterComponent} from "./auth/register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./dashboard/home/home.component";
import {NgModule} from "@angular/core";
import {TrashComponent} from "./dashboard/trash/trash.component";
import {ActiveFilesComponent} from "./dashboard/active-files/active-files.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'trash', component: TrashComponent
            },
            {
                path: 'active', component: ActiveFilesComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
