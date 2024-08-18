import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { BoardComponent } from "./board.component";

const routes: Routes = [
    {
        path: '',
        component: BoardComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class BoardRoutingModule { }