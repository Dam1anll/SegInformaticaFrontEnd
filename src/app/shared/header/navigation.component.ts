import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { VersionService } from '../../services/version.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  version: string | undefined;


  public showSearch = false;

  constructor(
    private modalService: NgbModal,
    public auth: AuthService,
    private versionService: VersionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.versionService.getVersion().subscribe((data: { version: string | undefined; }) => {
      this.version = data.version;
    });
  }

  goToTexto() {
    this.router.navigate(['/texto']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  ngAfterViewInit() { }
}
