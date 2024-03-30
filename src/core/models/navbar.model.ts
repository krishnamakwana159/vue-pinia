export class NavBarModel {
  path: string
  name: string
  children: NavBarModel[]

  constructor(path: string, name: string, children: NavBarModel[] = []) {
    this.path = path
    this.name = name
    this.children = children
  }
}
