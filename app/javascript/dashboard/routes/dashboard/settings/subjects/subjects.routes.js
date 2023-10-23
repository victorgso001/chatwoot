import SettingsContent from '../Wrapper';
import SubjectsHome from './Index';
import { frontendURL } from '../../../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/settings/subjects'),
      component: SettingsContent,
      props: {
        headerTitle: 'SUBJECTS_MGMT.HEADER',
        icon: 'code',
        showNewButton: false,
      },
      children: [
        {
          path: '',
          name: 'subjects_wrapper',
          redirect: 'list',
        },
        {
          path: 'list',
          name: 'subjects_list',
          component: SubjectsHome,
          roles: ['administrator'],
        },
      ],
    },
  ],
};
