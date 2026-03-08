import MainPage from '../../pages/main-page/main-page.tsx';
import {AuthorizationStatus} from '../../const';

type AppProps = {
  offersCount: number;
  authorizationStatus: AuthorizationStatus;
};

function App({offersCount, authorizationStatus}: AppProps): JSX.Element {

  return (
    <MainPage
      offersCount={offersCount}
      authorizationStatus={authorizationStatus}
    />
  );
}

export default App;
